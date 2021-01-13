# Cache Requests 
- Bust/delete them 1 hour to expiration
- Save them with the id/url as the key of the resource and pull it up if the key exists.
- if it exists, check if expiration is set and if so, check if it is not at least 2 hours close.
- If it is close to the time of expiration by at least 2 hours...bust/delete the key and regenerate a new video data.

# Queue Request
- Figure out how to hand over the processing to a new queue and send the request back to the main thread/process once done.
