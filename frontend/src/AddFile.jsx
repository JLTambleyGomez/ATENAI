import { StacksTestnet } from '@stacks/network';
import { stringAsciiCV, principalCV } from "@stacks/transactions";
import { openContractCall } from "@stacks/connect";
import React, { useState, useEffect } from 'react';
import "./assets/css/Landing.css";
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from "./Loading";

const AudioUploader = ({ walletAddress }) => {

    const [file, setFile] = useState(null);
    const [audioPreview, setAudioPreview] = useState('');
    const [error, setError] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');
    const [loading, setLoading] = useState(false);

    const network = new StacksTestnet();

    const appDetails = {
        name: "Atenai",
        icon: "",
    };

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAudioPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    const handleCleanPreview = () => {
        setAudioPreview("");
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile.type.startsWith('audio/')) {
            setFile(droppedFile);
        } else {
            setError('Please select a valid audio file.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file before submitting.');
            return;
        }

        setLoading(true);

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
            const ipfsHash = res.data.IpfsHash
            setFile(null);
            setAudioPreview('');
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'You have tokenized your audio.',
                confirmButtonColor: '#6b46c1',
                background: "#6200ee",
                color: "white",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            try {
                if (ipfsHash) {
                    const options = {
                        contractAddress: "ST3DPBBSE0B04WWBXXF8TNBRPDW72084WYXGEZERB",
                        contractName: "nft",
                        functionName: "mint",
                        functionArgs: [principalCV(walletAddress), stringAsciiCV(ipfsHash)],
                        network,
                        appDetails,
                        onFinish: ({ tokenId }) => console.log(tokenId),
                    };

                    await openContractCall(options);
                }
            } catch (error) {
                console.log("=> Error al mintear token:", error)
            }
        } catch (error) {
            console.error("Error uploading audio to IPFS", error);
            setError('Failed to upload the audio file to IPFS.');
            setFile(null);
            setAudioPreview('');
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to upload the audio file to IPFS.',
                confirmButtonColor: '#6b46c1',
            });
        }
    };

    return (
        <div className="upload" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <form className="" id="uploadForm" onSubmit={handleSubmit}>
                {audioPreview ? (
                    <div className="audio">
                        <audio controls >
                            <source src={audioPreview} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <p className="new" onClick={handleCleanPreview}>New</p>
                    </div>
                ) : (
                    <div className="drag-drop-area">
                        <p>Drag and drop your audio file here</p>
                    </div>
                )}

                <div className="">
                    <button className="tokenize" type="submit">Tokenize</button>
                </div>
            </form>

            <div className="options">
                {loading && <Loading />}
                <span>{error}</span>


                {ipfsHash && (
                    <span>
                        <button className="copy" onClick={() => {
                            navigator.clipboard.writeText(ipfsHash);
                            Swal.fire({
                                icon: 'success',
                                title: 'Copied',
                                text: 'Hash copied to clipboard!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }}>Copy Hash
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                            </svg>

                        </button>
                    </span>
                )}
                {ipfsHash && (
                    <span >
                        <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">View File</a>


                    </span>
                )}
            </div>
        </div>
    );
};

export default AudioUploader;
