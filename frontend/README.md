## MongoDB Installation and Importing Data
This guide provides step-by-step instructions on how to download and install MongoDB, add the path to system environment variables, and import available dummy data into MongoDB.

#### Installation
1. Visit the MongoDB download page at https://www.mongodb.com/try/download/community and download the latest version of MongoDB.

2. Once the download is complete, extract the downloaded files and copy them to a suitable location on your computer, such as C:\Program Files\MongoDB\Server\6.0\bin.

3. Add the path C:\Program Files\MongoDB\Server\6.0\bin to the system environment variables.

#### Importing Data
1. Get the "tool_mongodb" folder in this project and extract it to your computer. Or you can get tool mongodb at "https://www.mongodb.com/try/download/database-tools"

2. Copy all the files in the bin folder and paste them into C:\Program Files\MongoDB\Server\6.0\bin.

3. Get the "pharma_dumb" folder in this project and extract it to the D: drive.

4. Open a CMD in this path "C:\Program Files\MongoDB\Server\6.0\bin" and execute the following command:
```
mongorestore --db pharma D:\pharma_dumb
```
#### Exporting Data
```
mongodump --db name_database
```
## Steps to run this project in your local machine
To run this project in your local machine:
(nodejs compatible with version 16.x)

- Clone the repo
- Run ```npm install``` to install the dependencies
- Run ```npm run start``` to serve the app on your local machine.

To run this project with webpack:

- Change script start: 
```  
"scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
```
- Run ```npm run start``` to serve the app on your local machine.

## Documents helps to dev

https://react.dev/

https://jbetancur.github.io/react-data-table-component/?path=/story/custom-styles-compact-grid--compact-grid

https://www.educative.io/answers/how-to-create-a-react-application-with-webpack

## Review project
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/1c846db9-5cd0-4cf0-972c-ed2ec1cea564)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/4ddbfe14-fa93-4497-807e-780334808b34)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/7528cf2c-b289-4142-857e-51b07400a701)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/94572070-39e2-4b37-bfde-1fba7ba9edd3)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/6a47c850-b9b4-4cb5-9dcf-6f250278c52f)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/a4cff108-eea4-42c8-b522-4d4882038908)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/2f02e048-4bf1-41fc-8df9-1a003222e35e)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/8bc13b5f-950f-4807-ad43-284a2ace5056)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/73d017c3-405b-49aa-910f-8e0ca7b229cb)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/db3f61d2-2a78-46f9-9353-a3e2bf0ab002)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/07fb0512-b7b7-4298-9391-278fd602dcdc)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/4b7fbeb2-2f63-4e65-8f50-4b1e04145188)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/dc572953-1478-4783-9978-08f51dfc187d)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/972ee376-16d1-4c34-bb46-e969bd9f5ea0)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/f375cf32-7892-4a0d-99c1-8af73b8e9cfb)
![image](https://github.com/manage-pharma/admin-pharma/assets/59383987/3c1f04d6-644d-49e3-94d8-0ef509d03eea)
