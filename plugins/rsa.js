import {JSEncrypt} from "jsencrypt";

export default ({app}, inject) => {
    inject('encrypt', (str, pub_key) => {
        let jsencrypt = new JSEncrypt()
        jsencrypt.setPublicKey(pub_key)
        return jsencrypt.encrypt(str)
    })
}