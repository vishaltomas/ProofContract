import hashlib

def hash_file(file_url):
    """"This function returns the SHA-1 hash
    of the file passed into it"""

    hash = hashlib.sha1()
    with open(file_url, "rb") as file:
        # loop till EOF
        msg = 0
        while msg != b'':
            msg = file.read(1024)
            hash.update(msg)
        
    return hash.hexdigest()