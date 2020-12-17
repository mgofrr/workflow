const { v4: uuidv4 } = require('uuid');
const dbClient = require("../helpers/dbHelper");
const authenticationHelper = require("../helpers/authenticationHelper");
const { update } = require('../helpers/dbHelper');

const providers = {
    users: []
};

const resolvers = {
    async getProspect({ id }) {
        return (await dbClient.get({ Key: { id }})).Item;
    },
    async listProspects() {
        return (await dbClient.scan({})).Items;
    },
    async createProspect({ name, docid, place }) {
        try {
            if (await isPlaceInUse(place)) {
                throw new Error("A praça já está em uso.");
            }
            let item = {
                id: uuidv4(),
                name,
                docid,
                documents: [],
                place,
                status: 'pending'
            };
            
            let token = await authenticationHelper.generateToken(item);
            item.token = token;

            let user = await dbClient.put({ Item: item });
            if (!Object.keys(user).length) {
                return item;
            } else {
                throw new Error("Não foi possível inserir usuário.");
            }
        } catch(err) {
            throw err;
        }
    },
    async updateProspect({ prospectId, name, link }) {
        try {
            const params = {
                Key: { id: prospectId },
                UpdateExpression: "SET documents = list_append(documents, :documents)",
                ExpressionAttributeValues:  {
                    ":documents" : [{
                        "name": name,
                        "link": link,
                        "status": "pending"
            
                    }]
                },
                ReturnValues: "UPDATED_NEW"
            };
            let updated = await dbClient.update(params);
            return JSON.stringify(updated);
        } catch(err) {
            console.log("update err:", err);
            throw err;
        }
    }
};

const isPlaceInUse = async (place) => {
    let data = await dbClient.scan({
        FilterExpression: "place = :p and #s <> :s",
        ExpressionAttributeNames: {
            "#s": "status"
        },
        ExpressionAttributeValues: {
            ":p": place,
            ":s": "rejected"
        },
    });
    return (data.Items.length);
}

module.exports = {resolvers};