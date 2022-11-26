# import from python built-in modules
from datetime import datetime
import os
import uuid

# imports from flask module
from flask import Blueprint, render_template, redirect, url_for, current_app, jsonify, request
from flask_login import current_user, login_required
from werkzeug.utils import secure_filename

# imports from relative files
from . import SQLdb
from .form import CreateDocForm
from .db import Document
from .components.NftStorage import NftStorage
from .components.FileHash import hash_file


# creating api blueprint for routing purposes
main_bp = Blueprint(
    'main_bp', __name__,
    template_folder='templates',
    static_folder='static'
)

# Initializing response states
res_state = {
    "OK": "success",
    "ERR": "fail"
}

# Route healthCheck: To get status of application
@main_bp.route("/healthCheck")
def healthCheck():
    return "App is up and running successful"

# Route upload: To upload the file received from client application
@main_bp.route("/upload", methods=['POST'])
def upload():
    
    form = CreateDocForm()

    if form.validate_on_submit():
        docname = form.docname.data
        document = form.document.data
        filename = secure_filename(document.filename)
        filepath = os.path.join("src/data/docs", filename)
        fileID = str(uuid.uuid4())
        # save the document to local storage
        document.save(filepath)
        # insert to DB
        doc = Document(
            id=fileID,
            created_by=1234, #Need to change the assignment
            created_date=datetime.now(),
            docname=docname,
            document_file_name=filename,
            IPFS_status=False,
            IPFS_cid="Nil",
            file_hash=hash_file(filepath)
        )
        SQLdb.session.add(doc)
        SQLdb.session.commit()
        query_result = SQLdb.session.query(Document).filter(Document.id == fileID).all()
        db_data = query_result[0]
        doc_metadata =  {
            "id": db_data.id,
            "created_by": db_data.created_by,
            "created_date": db_data.created_date,
            "docname": db_data.docname,
            "document_file_name": db_data.document_file_name,
            "file_hash": db_data.file_hash
        }
        # if form validation and insertion to DB is successful
        response = {
            "status": res_state["OK"],
            "message": "Document Uploaded Successfully",
            "content": doc_metadata
        }
        print(response)
        return jsonify(response)
    
    # if form validation fails:
    response = {
        "status": res_state["ERR"],
        "message": "Document Failed to Upload",
        "errors": form.errors.items()
    }
    print(response)
    return jsonify(response)

# Route uploadIPFS: To upload files to IPFS
@main_bp.route('/uploadIPFS', methods=['GET'])
# @login_required
def uploadIPFS():
    """
        For data size limit and for safety reasons NFT storage is disabled as of now.
        Response from NFT is mocked
    """ 
    args = request.args
    fileID = args.get("id")
    query_res = SQLdb.session.query(Document.document_file_name).where(Document.id == fileID)
    # get the filename from query result
    filename = query_res[0][0] 
    filepath = os.path.join("src/data/docs", filename)
    # nftStorage = NftStorage()
    # res = nftStorage.upload(filepath=filepath, id=fileID)
    mock_res = {
                "ok": True,
                "value": {
                    "cid": "bafkreidivzimqfqtoqxkrpge6bjyhlvxqs3rhe73owtmdulaxr5do5in7u",
                    "size": 132614,
                    "created": "2021-03-12T17:03:07.787Z",
                    "type": "image/jpeg",
                    "scope": "default",
                    "pin": {
                    "cid": "bafkreidivzimqfqtoqxkrpge6bjyhlvxqs3rhe73owtmdulaxr5do5in7u",
                    "name": "pin name",
                    "meta": {},
                    "status": "queued",
                    "created": "2021-03-12T17:03:07.787Z",
                    "size": 132614
                    },
                    "files": [
                    {
                        "name": "logo.jpg",
                        "type": "image/jpeg"
                    }
                    ],
                    "deals": [
                    {
                        "batchRootCid": "bafkreidivzimqfqtoqxkrpge6bjyhlvxqs3rhe73owtmdulaxr5do5in7u",
                        "lastChange": "2021-03-18T11:46:50.000Z",
                        "miner": "f05678",
                        "network": "nerpanet",
                        "pieceCid": "bafkreidivzimqfqtoqxkrpge6bjyhlvxqs3rhe73owtmdulaxr5do5in7u",
                        "status": "queued",
                        "statusText": "miner rejected my data",
                        "chainDealID": 138,
                        "dealActivation": "2021-03-18T11:46:50.000Z",
                        "dealExpiration": "2021-03-18T11:46:50.000Z"
                    }
                    ]
                }
                }
    if mock_res["ok"] == True:
        
        response = {
            "status": res_state["OK"],
            "message": "Document Uploaded Successfully to IPFS",
            "content": mock_res
        }
        print(response)
        return response

    response = {
            "status": res_state["OK"],
            "message": "Document Uploaded Successfully",
            "errors": mock_res.error
        }
    print(response)
    return response




    