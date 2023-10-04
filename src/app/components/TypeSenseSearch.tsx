'use client'
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

let TYPESENSE_SERVER_CONFIG = {
  apiKey: 'xyz', // Be sure to use an API key that only allows searches, in production
  nodes: [
    {
      host: 'localhost',
      port: 8108,
      protocol: 'http',
    },
  ],
  connectionTimeoutSeconds: 1,
  numRetries: 8,
};

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  additionalSearchParameters: {
    // The following parameters are directly passed to Typesense's search API endpoint.
    //  So you can pass any parameters supported by the search endpoint below.
    //  queryBy is required.
    query_by: 'name,categories,description',
    query_by_weights: '4,2,1',
    num_typos: 1,
    typo_tokens_threshold: 1,
    // By default, Typesense approximates facet counts for performance.
    // Turning on exhaustive search will get you accurate facet counts, at the cost of a slight performance hit.
    exhaustive_search: true,
    // group_by: "categories",
    // group_limit: 1
    // pinned_hits: "23:2"
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export default function TypeSenseSearch() {
  return (
    <div>
      <InstantSearch indexName='products' searchClient={searchClient} >
        <SearchBox />
        <Hits/>
      </InstantSearch>
    </div>
  )
}