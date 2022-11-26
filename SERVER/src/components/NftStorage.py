import requests
from requests.structures import CaseInsensitiveDict 

NFT_API_KEY="API_KEY"
NFT_URL="https://api.nft.storage"

class NftStorage:
    def __init__(self):
        self.api_url = NFT_URL
    def upload(self, filepath, id):
        view = "/upload"
        link = self.api_url + view
        headers = CaseInsensitiveDict()
        # Add authorization headers to request
        headers["Authorization"] = f"Bearer {NFT_API_KEY}"
        # open file to upload to IPFS
        with open(filepath, "rb") as file:
            content = file.read()
            files = {
                id: content
            } 
            response = requests.post(link, data=files, headers=headers)
            print(response.json())
            response.encoding = 'utf-8'
            return response.json()
