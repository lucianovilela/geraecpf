package com.vilela.geraecpf;

import java.io.FileInputStream;
import java.io.InputStream;
import java.io.Serializable;
import java.math.BigInteger;
import java.security.KeyPair;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api")
public class CriaCertController {
    private class Response implements Serializable {
        public Response(String status, String message) {
            this.status = status;
            this.message = message;
        }

        public String status;
        public String message;
    }

    @GetMapping("/pessoaFisica")

    public Response gercert(
            @RequestParam(defaultValue = "") String subject,
            @RequestParam String serialNumber,
            @RequestParam Integer validityInDays,
            @RequestParam String nome,
            @RequestParam String cpf

    )throws Exception {
        KeyPair myKeyPair = CriaCertificadoTest.genKeyPair(2048);

        String acSubject = "C=BR,O=TRT2,CN=AC Test";
        char[] password = "123456".toCharArray();
        KeyStore ks = KeyStore.getInstance("JKS");
        // carrega o certificado da AC
        InputStream in = new FileInputStream("actest.jks");
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
        return new Response("ok", cert.toString());
    }

}
