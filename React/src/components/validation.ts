import {ALG, jwtKey, tokenName} from "../../../config.ts";
import * as jwt from "jose";

export async function validateLogin(): Promise<number | null> {
    const encryptedToken = localStorage.getItem(tokenName);
    if (!encryptedToken) {
        return null;
    }
    try {
        const { payload } = await jwt.jwtVerify(encryptedToken, jwtKey, { algorithms: [ALG] });
        if (!payload.exp) {
            return null;
        }
        if (Math.floor(Date.now() / 1000) < payload.exp) {
            return payload.id as number;
        } else return null;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}