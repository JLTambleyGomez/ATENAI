import { StacksTestnet } from '@stacks/network';
// import {  } from '@stacks/transactions';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');
    const [ipfsUrl, setIpfsUrl] = useState('');

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Por favor, selecciona un archivo antes de enviar.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_PINNATA_API_KEY}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setIpfsHash(res.data.IpfsHash);
            setIpfsUrl(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
            setFile(null);
            setImagePreview('');
        } catch (error) {
            console.error("=> Error al enviar imagen a IPFS", error);
            setError('No se pudo subir la imagen a IPFS.');
            setFile(null);
            setImagePreview('');
        }
    };

    const mintNFT = async (recipient, ipfsHash) => {
        const network = new StacksTestnet(); // O StacksTestnet si estás en testnet
        const contractAddress = 'SP0000000000000000000000000000000000000000'; // Dirección del contrato
        const functionName = 'mint';
        const functionArgs = [recipient, ipfsHash];

        try {
            const result = await callContractFunction({
                network,
                contractAddress,
                functionName,
                functionArgs,
                // Aquí también necesitarás proporcionar la configuración de la sesión del usuario
                // y posiblemente la clave privada para firmar la transacción
            });
            console.log('NFT minted successfully:', result);
        } catch (error) {
            console.error('Error minting NFT:', error);
        }
    };

    return (
        <div className="">
            <form className="" id="uploadForm" onSubmit={handleSubmit}>
                <label htmlFor="file">Upload your File:</label>
                <input className="" type="file" name="file" id="file" onChange={handleFileChange} />
                <div className="">
                    <button className="" type="submit">Submit</button>
                </div>
            </form>
            <div className="">
                <span>{error}</span>
                <span>{ipfsHash && `IPFS Hash: ${ipfsHash}`}</span>
                <span>{ipfsUrl && `View the file here: ${ipfsUrl}`}</span>
            </div>
        </div>
    );
};

export default ImageUploader;