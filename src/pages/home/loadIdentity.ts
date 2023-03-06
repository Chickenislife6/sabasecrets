import { SignalProtocolStore } from "@/utility/storage-type";
import {
    KeyHelper,
    SignedPublicPreKeyType,
    SignalProtocolAddress,
    SessionBuilder,
    PreKeyType,
    SessionCipher,
    MessageType,
    KeyPairType,
} from "@privacyresearch/libsignal-protocol-typescript";
import { deserializeKeyRegistrationBundle, FullDirectoryEntry, serializeKeyRegistrationBundle } from "../../utility/serialize";
import { getKeyPair } from "./createID";

export const loadIdentity = async (signalStore: SignalProtocolStore) => {
    // storage in localstorage please fix
    const registrationId = window.localStorage.getItem(`registrationID`);
    signalStore.put(`registrationID`, registrationId!)

    const identityKeyPair = getKeyPair('identityKey');
    signalStore.put('identityKey', identityKeyPair);

    // const preKey = await KeyHelper.generatePreKey(baseKeyId)
    // getKeyPair(`${baseKeyId}`)
    // signalStore.storePreKey(`${baseKeyId}`, preKey.keyPair)

    // const signedPreKeyId = Math.floor(10000 * Math.random());
    // const signedPreKey = await KeyHelper.generateSignedPreKey(identityKeyPair, signedPreKeyId)
    // storeKeyPair(`${signedPreKeyId}`, signedPreKey.keyPair)
    // signalStore.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair)

    // Now we register this with the server or other directory so all users can see them.
}