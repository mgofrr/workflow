const schema = `
    
    type Prospect {
        id: ID
        name: String
        docid: String
        token: String
        place: String
        status: String
        documents: [Document]
    }
    type Document {
        id: ID
        order: Int
        name: String
        link: String
        status: String
    }
    type Query {
        getProspect(id: String!): Prospect
        listProspects: [Prospect]
        getUploadLink: String
    }
    type Mutation {
        createProspect(name: String!, docid:String!, place:String!): Prospect
        updateProspect(prospectId: String!, name: String!, link: String! ): Prospect
    }
    enum ProspectStatus {
        pending
        rejected
        aproved
    }
    enum DocumentStatus {
        pending
        rejected
        aproved
    }
`;

module.exports = {schema};
