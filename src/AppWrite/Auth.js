import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";


export class AuthSevice {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // call another method
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error",error)
        }
    }

    async login({ email, password }) {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.error("Appwrite service :: login :: error",error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error",error)
        }
        return null;
    }

    async logout() {
        // eslint-disable-next-line no-useless-catch
        try {
            return this.account.deleteSessions()
        } catch (error) {
            console.error("Appwrite service :: logout :: error",error)
        }
    }
}

const authSevice = new AuthSevice();
export default  authSevice;