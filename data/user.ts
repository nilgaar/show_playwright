import { generateRandomString } from '../tools/utils'

export enum UserGeneratorOptions {
    shortPassword,
    missmatchPassword,
}

export type GenerationOptions = UserGeneratorOptions[]
export type Credentials = {
    username: string
    password: string
}

export class User {
    firstName: string
    lastName: string
    username: string
    password: string

    constructor(
        firstName: string,
        lastName: string,
        username: string,
        password: string
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.username = username
        this.password = password
    }

    static createRandomUser(
        options?: GenerationOptions,
        firstName?: string,
        lastName?: string,
        username?: string,
        password?: string
    ): User {
        const randomFirstName = firstName || generateRandomString(5)
        const randomLastName = lastName || generateRandomString(5)
        const randomUsername = username || generateRandomString(8)
        const randomPassword =
            password ||
            generateRandomString(
                options?.includes(UserGeneratorOptions.shortPassword) ? 3 : 8
            )

        return new User(
            randomFirstName,
            randomLastName,
            randomUsername,
            randomPassword
        )
    }

    toStringArray(): string[] {
        return [this.firstName, this.lastName, this.username, this.password]
    }
}
