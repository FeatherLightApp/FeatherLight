import { provide } from '@vue/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { Context } from '@nuxt/types'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import introspectionQueryResultData from '~/types/fragments'
import useEndpoint from '~/composition/useEndpoint'

const { getEndpoint } = useEndpoint()

const link = createHttpLink({
    uri: getEndpoint(),
    credentials: 'include'
})

const authLink = setContext(async (_, { headers }) => {
    const { authStore } = await import('~/store')
    return {
        headers: {
            ...headers,
            Authorization: authStore.access || authStore.attenuated || ''
        }
    }
})

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher })

const apolloClient = new ApolloClient({
    link: authLink.concat(link),
    cache
})

export default function ({ app }: Context) {
    app.setup = () => {
        provide(DefaultApolloClient, apolloClient)
        return {}
    }
}