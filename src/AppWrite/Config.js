import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query } from "appwrite";

export class Services {
    client = new Client();
    databases;
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.client)    
        this.bucket = new Storage(this.client)    
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, //as unique id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.error("Appwrite service :: createPost :: error",error)
            return false
        }
    }

    async updatePost(slug, {title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error",error)
            return false
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error",error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("Appwrite service :: getPost :: error",error)
            false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error",error)
            return false
        }
    }

    // File upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                file
            )
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error",error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error",error)
            return false
        }
    }

    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error",error)
            return false
        }
    }
}

const services = new Services();

export default services;