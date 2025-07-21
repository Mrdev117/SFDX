import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

const ACCOUNT_QUERY = gql`
query {
    uiapi {
        query {
            Account {
                edges {
                    node {
                        Id
                        Name {
                            value
                        }
                    }
                }
            }
        }
    }
}`;

export default class GraphqlAccountList extends LightningElement {
    @wire(graphql, { query: ACCOUNT_QUERY })
    accounts;

    get accountData() {
        if (this.accounts.data) {
            return this.accounts.data.uiapi.query.Account.edges.map(edge => ({
                id: edge.node.Id,
                name: edge.node.Name.value
            }));
        }
        return [];
    }

    get hasError() {
        return this.accounts.error;
    }
}