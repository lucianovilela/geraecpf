import React, { useState } from 'react';
import { TextField, Stack, Button, Box, Link, CircularProgress } from '@mui/material';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
const INITIAL_VALUE = {
    subject: "C=BR,O=ICP-Brasil,OU=AR Teste,OU=RFB e-CPF A3,OU=TESTE",
    serialNumber: '',
    validityInDays: '365',
    nome: '',
    cpf: '',
    senha: '123456',
    certificado: undefined,
    loading: false
};
export const FormCertificado = () => {
    const geraCerticado = () => {
        setObj({ ...obj, loading: true, certificado: undefined });
        fetch(`/certificado/pessoaFisica?serialNumber=${obj.serialNumber}&subject=${obj.subject}&validityInDays=${obj.validityInDays}&nome=${obj.nome}&cpf=${obj.cpf}&senha=${obj.senha}`
            , { method: 'POST' })
            .then(resposta => resposta.json())
            .then(resposta => {
                setObj({ ...obj, loading: false });
                if (resposta.status === 'ok') {
                    setObj(ant => ({ ...ant, certificado: resposta.message }));
                }

            });

    }

    const [obj, setObj] = useState(INITIAL_VALUE);
    return (
        <React.Fragment>
            <Stack direction="column" spacing={1} >
                <TextField label="Subject" placeholder="subject"
                    value={obj.subject}
                    onChange={(e) => (setObj(ant => ({ ...ant, subject: e.target.value })))} />

                <TextField label="Serial Number" placeholder="serialNumber"
                    value={obj.serialNumber}
                    onChange={(e) => (setObj(ant => ({ ...ant, serialNumber: e.target.value })))} />

                <TextField label="Validade(em dias)"
                    placeholder="validityInDays"
                    value={obj.validityInDays}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={(e) => (setObj(ant => ({ ...ant, validityInDays: e.target.value })))} />

                <TextField label="Nome" placeholder="nome"
                    value={obj.nome}
                    onChange={(e) => (setObj(ant => ({ ...ant, nome: e.target.value })))} />

                <TextField
                    label="CPF" placeholder="cpf"
                    value={obj.cpf}
                    onChange={(e) => (setObj(ant => ({ ...ant, cpf: e.target.value })))} />

                <TextField
                    value={obj.senha}
                    label="Senha para arquivo pfx" placeholder="senha"
                    onChange={(e) => (setObj(ant => ({ ...ant, senha: e.target.value })))} />

                <Button mb={10} variant="contained" color="primary" onClick={geraCerticado}>Gerar Certificado</Button>
                <Button variant="contained" color="warning" onClick={() => setObj(INITIAL_VALUE)}>Clear</Button>
                <Box sx={{ display: obj.loading ? 'flex' : 'none', margin: '10px' }}>
                    <CircularProgress />
                </Box>


                <Box sx={{ display: obj.certificado ? 'flex' : 'none', margin: '10px' }} justifyContent={'center'}>

                    <Link href={`data:application/x-pkcs12;filename=ecpf-fake.pfx;base64,${obj.certificado}`}>
                        <EnhancedEncryptionIcon />Certificado</Link>
                </Box>

            </Stack>
        </React.Fragment>
    )
}
