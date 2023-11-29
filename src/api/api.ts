import { Account, Client as Appwrite, Databases } from 'appwrite'
import { server } from '../utils/config'

let api = {
  sdk: null as null | { database: Databases },

  provider: () => {
    if (api.sdk) {
      return api.sdk
    }
    let appwrite = new Appwrite()
    appwrite.setEndpoint(server.endpoint).setProject(server.project)
    const database = new Databases(appwrite)

    api.sdk = { database }
    return api.sdk
  },

  getEventById: async (documentId: string) => {
    let req = await api.provider().database.getDocument('63e2b4503fa1bf5d1a5f', '63e2b456b185a4c53116', documentId)
    return req
  }
}
export default api
