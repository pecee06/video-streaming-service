# Random Info

```
It's a good practice to configure .prettierrc file as it creates consistency in the codebase, if there are multiple developers working on the same project

dotenv should be configured immediately (and only) in the entry point of the application, generally index.js

We can use .env variables within .env file - just prefix the variable name with '$' wherever you want to use its value in the file

Database connection function should always be wrapped under try-catch block and it have to be an async function, as establishing connection with a remote DB takes time
```

# Standardization

* We've standardized Errors & Responses by making their utilities

# File handling

* Express by itself doesn't provide any feature to deal with files (like uploading to a cloud service eg. **Cloudinary**)
* Thus we'll use another library for that - **multer**