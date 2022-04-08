package com.vilela.geraecpf.controller;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.Serializable;
import java.math.BigInteger;
import java.security.KeyPair;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;

import org.bouncycastle.util.encoders.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vilela.geraecpf.lib.CriaCertificadoTest;

@RestController("")
@RequestMapping("/certificado")
public class CriaCertController {
	
	@Value("classpath:actest.jks")
	Resource jksfile;
    private class Response implements Serializable {
        public Response(String status, String message) {
            this.status = status;
            this.message = message;
        }

        public String status;
        public String message;
    }

    @PostMapping("pessoaFisica")
    public Response gercert(
            @RequestParam(defaultValue = "C=BR,O=ICP-Brasil,OU=AR Teste,OU=RFB e-CPF A3,OU=TESTE,CN=teste:11111111111", required = false) String subject,
            @RequestParam(defaultValue = "333333", required = false) String serialNumber,
            @RequestParam(defaultValue = "10",required = false) Integer validityInDays,
            @RequestParam(defaultValue = "", required = false) String nome,
            @RequestParam(defaultValue = "", required = false) String cpf

    )throws Exception {
        KeyPair myKeyPair = CriaCertificadoTest.genKeyPair(2048);

        String acSubject = "C=BR,O=TRT2,CN=AC Test";
        char[] password = "123456".toCharArray();
        KeyStore ks = KeyStore.getInstance("JKS");
        // carrega o certificado da AC
        InputStream in = jksfile.getInputStream();
        ks.load(in, password);
        in.close();

        // obtém o certificado e as chaves da AC
        X509Certificate acCert = (X509Certificate) ks.getCertificate("main");
        KeyPair acKeyPair = new KeyPair(acCert.getPublicKey(), (PrivateKey) ks.getKey("main", password));

        X509Certificate cert = CriaCertificadoTest.createCert(subject,
                new BigInteger(serialNumber, 16),
                validityInDays,
                myKeyPair,
                acKeyPair,
                acSubject, cpf, acCert);
        ByteArrayOutputStream out =(ByteArrayOutputStream) CriaCertificadoTest.saveToKeystore(cert, myKeyPair.getPrivate(),  "PKCS12", acCert);
        
        return new Response("ok",  new String(Base64.encode(out.toByteArray())));
    }

}
