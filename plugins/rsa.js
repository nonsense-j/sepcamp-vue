import {JSEncrypt} from "jsencrypt";

export default ({app}, inject) => {
    inject('encrypt', (str, pub_key) => {
        console.log(str)
        console.log(pub_key)
        let jsencrypt = new JSEncrypt()
        jsencrypt.setPublicKey(pub_key)
        console.log(jsencrypt.encrypt(str))
        return jsencrypt.encrypt(str)
    })
}