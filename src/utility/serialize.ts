
import { SignedPublicPreKeyType, DeviceType, PreKeyType } from '@privacyresearch/libsignal-protocol-typescript'
import * as base64 from 'base64-js'

export interface PublicDirectoryEntry {
    identityKey: ArrayBuffer
    signedPreKey: SignedPublicPreKeyType
    oneTimePreKey?: ArrayBuffer
}

export interface FullDirectoryEntry {
    registrationId: number
    identityKey: ArrayBuffer
    signedPreKey: SignedPublicPreKeyType
    oneTimePreKeys: PreKeyType[]
}

export interface PublicPreKey {
    keyId: number
    publicKey: string
}

export interface SignedPublicKey {
    keyId: number
    publicKey: string
    signature: string
}

export interface PublicPreKeyBundle {
    identityKey: string
    signedPreKey: SignedPublicKey
    preKey?: PublicPreKey
    registrationId: number
}

export interface SerializedFullDirectoryEntry {
    registrationId: number
    identityKey: string
    signedPreKey: SignedPublicKey
    oneTimePreKeys: PublicPreKey[]
}


export function serializeKeyRegistrationBundle(dv: FullDirectoryEntry): SerializedFullDirectoryEntry {
    const identityKey = base64.fromByteArray(new Uint8Array(dv.identityKey))
    const signedPreKey: SignedPublicKey = {
        keyId: dv.signedPreKey.keyId,
        publicKey: base64.fromByteArray(new Uint8Array(dv.signedPreKey.publicKey)),
        signature: base64.fromByteArray(new Uint8Array(dv.signedPreKey.signature)),
    }

    const oneTimePreKeys: PublicPreKey[] = dv.oneTimePreKeys.map((pk) => ({
        keyId: pk.keyId,
        publicKey: base64.fromByteArray(new Uint8Array(pk.publicKey)),
    }))

    return {
        identityKey,
        signedPreKey,
        oneTimePreKeys,
        registrationId: dv.registrationId!,
    }
}

export function deserializeKeyRegistrationBundle(dv: SerializedFullDirectoryEntry): FullDirectoryEntry {
    const identityKey = base64.toByteArray(dv.identityKey).buffer;
    console.log("tset")
    const signedPreKey: SignedPublicPreKeyType = {
        keyId: dv.signedPreKey.keyId,
        publicKey: base64.toByteArray(dv.signedPreKey.publicKey).buffer,
        signature: base64.toByteArray(dv.signedPreKey.signature).buffer,
    }

    const oneTimePreKeys: PreKeyType[] = dv.oneTimePreKeys.map((pk) => ({
        keyId: pk.keyId,
        publicKey: base64.toByteArray(pk.publicKey).buffer,
    }))

    return {
        identityKey,
        signedPreKey,
        oneTimePreKeys,
        registrationId: dv.registrationId!,
    }
}

export function serializeKeyBundle(dv: DeviceType): PublicPreKeyBundle {
    const identityKey = base64.fromByteArray(new Uint8Array(dv.identityKey))
    const signedPreKey: SignedPublicKey = {
        keyId: dv.signedPreKey.keyId,
        publicKey: base64.fromByteArray(new Uint8Array(dv.signedPreKey.publicKey)),
        signature: base64.fromByteArray(new Uint8Array(dv.signedPreKey.signature)),
    }

    const preKey: PublicPreKey = {
        keyId: dv.preKey!.keyId,
        publicKey: base64.fromByteArray(new Uint8Array(dv.preKey!.publicKey)),
    }

    return {
        identityKey,
        signedPreKey,
        preKey,
        registrationId: dv.registrationId!,
    }
}

export function deserializeKeyBundle(kb: PublicPreKeyBundle): DeviceType {
    const identityKey = base64.toByteArray(kb.identityKey).buffer
    const signedPreKey: SignedPublicPreKeyType = {
        keyId: kb.signedPreKey.keyId,
        publicKey: base64.toByteArray(kb.signedPreKey.publicKey).buffer,
        signature: base64.toByteArray(kb.signedPreKey.signature).buffer,
    }
    const preKey: PreKeyType | undefined = kb.preKey && {
        keyId: kb.preKey.keyId,
        publicKey: base64.toByteArray(kb.preKey.publicKey).buffer,
    }

    return {
        identityKey,
        signedPreKey,
        preKey,
        registrationId: kb.registrationId,
    }
}

export function serializePreKeyArray(keys: PreKeyType[]): PublicPreKey[] {
    const serialized: PublicPreKey[] = [];
    for (let key in keys) {
        const preKey: PublicPreKey = {
            keyId: keys[key].keyId,
            publicKey: base64.fromByteArray(new Uint8Array(keys[key].publicKey)),
        }
        serialized.push(preKey);
    }
    return serialized;
}

export function deserializePreKeyArray(keys: PublicPreKey[]): PreKeyType[] {
    const deserialized: PreKeyType[] = [];
    for (let key in keys) {
        const preKey: PreKeyType = {
            keyId: keys[key].keyId,
            publicKey: base64.toByteArray(keys[key].publicKey).buffer,
        }
        deserialized.push(preKey);
    }
    return deserialized;
}