import React, { useState } from 'react';
import { TextField, Stack, Button, Box } from '@mui/material';
const INITIAL_VALUE={
    subject: "C=BR,O=ICP-Brasil,OU=AR Teste,OU=RFB e-CPF A3,OU=TESTE",
    serialNumber: '',
    validityInDays: '365',
    nome: '',
    cpf: '',
    senha: '123456',
    certificado:undefined
};
export const FormCertificado = () => {
    const geraCerticado=()=>{
        fetch(`http://localhost:8080/certificado/pessoaFisica?serialNumber=${obj.serialNumber}&subject=${obj.subject}&validityInDays=${obj.validityInDays}&nome=${obj.nome}&cpf=${obj.cpf}&senha=${obj.senha}`
        ,{method:'POST'})
        .then(resposta => resposta.json())
        .then(resposta => {
            console.log(resposta);
            if(resposta.status === 'ok'){
                setObj(ant=>({...ant, certificado:resposta.message}));
            }

        });

    }

    const [obj, setObj] = useState(INITIAL_VALUE);
    return (
        <React.Fragment>
            <Stack direction="column" >
                <TextField sx={{ margin: "10px" }} label="Subject" placeholder="subject"
                    value={obj.subject}
                    onChange={(e) => (setObj(ant => ({ ...ant, subject: e.target.value })))} />

                <TextField sx={{ margin: "10px" }} label="Serial Number" placeholder="serialNumber"
                    value={obj.serialNumber}
                    onChange={(e) => (setObj(ant => ({ ...ant, serialNumber: e.target.value })))} />

                <TextField sx={{ margin: "10px" }} label="Validade(em dias)"
                    placeholder="validityInDays"
                    value={obj.validityInDays}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={(e) => (setObj(ant => ({ ...ant, validityInDays: e.target.value })))} />

                <TextField sx={{ margin: "10px" }} label="Nome" placeholder="nome"
                    value={obj.nome}
                    onChange={(e) => (setObj(ant => ({ ...ant, nome: e.target.value })))} />

                <TextField sx={{ margin: "10px" }}
                    label="CPF" placeholder="cpf"
                    value={obj.cpf}
                    onChange={(e) => (setObj(ant => ({ ...ant, cpf: e.target.value })))} />

                <TextField sx={{ margin: "10px" }}
                    value={obj.senha}
                    label="Senha para arquivo pfx" placeholder="senha"
                    onChange={(e) => (setObj(ant => ({ ...ant, senha: e.target.value })))} />

                <Button variant="contained" color="primary" onClick={geraCerticado}>Gerar Certificado</Button>
                <Button variant="contained" color="warning" onClick={()=>setObj(INITIAL_VALUE)}>Clear</Button>
            </Stack>
            <Box sx={{display:obj.certificado?'flex':'none'}}>
                

                <a href={`data:application/x-pkcs12;name=ecpf-fake.pfx;base64,${obj.certificado}`}>Arquivo</a>
                 
            </Box>
        </React.Fragment>
    )
}
