import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'semantic-ui-css/semantic.min.css'

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
})


ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
	, document.getElementById('root')
)
registerServiceWorker()
