// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

error Nonce_Is_Used();
error SignerAddress_Recovery_Failed();
error Invalid_Signature_By_Owner();
// error Invalid_Recepient_Address();

contract AffidavitSign{
    
    using SignatureChecker for *;
    using ECDSA for *;

// Event is emitted when Owner's signature is verified
    event SignatureVerified(address owner, address recepient, bytes32 msghash);
// Event is emitted when Recepient signed the document successfully
    event RecepientSigned(address from, address to, bytes32 ipfshash, bytes32 filehash);

    address immutable i_owner;
    address private i_recepient;
    mapping(uint256 => bool) private nonceBurned;
    
    constructor(){
        i_owner = msg.sender;
    }

    function mainSignProcess(
        bytes memory signature,
        uint256 nonce,
        bytes32 ipfs_hash,
        bytes8 msgId,
        bytes32 filehash
    ) public{
        // storing caller address
        i_recepient = msg.sender;
        //Verifying message
        messageVerify( signature, nonce, ipfs_hash, msgId);
        //If message is verified sign the document
        docuSign(ipfs_hash, filehash);
    }

    function messageVerify(
        bytes memory signature,
        uint256 nonce,
        bytes32 ipfs_hash,
        bytes8 msgId
        ) internal{
        //variables
        ECDSA.RecoverError errorRecoverSigner;
        address signer;
        //recreate hash 
        bytes32 message_hash = recreateMessage(nonce, ipfs_hash, msgId);
        //recover signer address 
        (signer, errorRecoverSigner) = ECDSA.tryRecover(message_hash, signature);
        if(errorRecoverSigner != ECDSA.RecoverError.NoError) revert SignerAddress_Recovery_Failed();
        //Verify signature
        bool isValidSign = SignatureChecker.isValidSignatureNow(signer, message_hash, signature);
        if(!isValidSign) revert Invalid_Signature_By_Owner();
        // emits Signature Verified event
        emit SignatureVerified(i_owner, i_recepient, message_hash);
        
    }

    function docuSign(bytes32 ipfs_hash, bytes32 filehash) internal{
        emit RecepientSigned(i_owner, i_recepient, ipfs_hash, filehash);        
    }
 

    function recreateMessage(
        uint256 nonce,
        bytes32 ipfs_hash,  
        bytes8 msgId       
    ) internal returns(bytes32){
        //Check whther nonce is used,if it is revert the transaction, if not add to nonceBurned mapping
        if(!nonceBurned[nonce]) revert Nonce_Is_Used();
        nonceBurned[nonce] = true;
        //recreate Messgae
        return keccak256(abi.encodePacked(msgId, ipfs_hash, nonce, address(msg.sender), address(this)));
    }
    
    // getters
    
    function getOwnerOfContract() view public returns(address){
        return i_owner;
    }

}