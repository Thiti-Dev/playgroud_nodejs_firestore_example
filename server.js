const express = require('express');
const Firestore = require('@google-cloud/firestore');
const app = express();

const port = 5000;

const firestore = new Firestore();
async function main() {

    const document = firestore.doc('posts/intro-to-firestore');
    console.log('Document created');

    // Enter new data into the document.
    await document.set({
        title: 'Welcome to Firestore',
        body: 'Hello World',
    });
    console.log('Entered new data into the document');

    // Update an existing document.
    await document.update({
        body: 'My first Firestore app',
    });
    console.log('Updated an existing document');

    // Read the document.
    let doc = await document.get();
    console.log('Read the document');

    // Delete the document.
    //await document.delete();
    //console.log('Deleted the document');

};

async function createtest() {
    let collectionRef = firestore.collection('col');

    collectionRef.add({ foo: 'bar' , data:"test"}).then(documentReference => {
        let firestore = documentReference.firestore;
        console.log(`Root location for document is ${firestore.formattedName}`);
    });
}

async function searchtest(){
    let documentRef = firestore.doc('col/doc');
    let collectionRef = documentRef.parent;

    let resultTemp;

    /*await collectionRef.where('foo', '==', 'bar').select('foo').get()
        .then(res => {
            console.log(`done == ${res.docs[0].get('foo')}`)
        })*/

    await collectionRef.where('foo', '==', 'bar').get()
        .then(res => {
            if(res.size > 0){
                console.log(`done == ${res.docs[0].get('data')}`)
            }else{
                console.log("data not found");
            }
        })
    //return resultTemp
}

async function readdoc(){
    var testRef = firestore.collection('posts').doc('intro-to-firestore');
    var getDoc = testRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data().title);
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
}

async function updatedoc(){
    const document = firestore.doc('posts/intro-to-firestore');
    // Update an existing document.
    await document.update({
        body: 'fuck off bitch',
    });
    console.log("updated")

}

app.get('/' , (req,res) => {
    res.send("This is working");
})

app.get('/test', (req, res) => {
    main().catch(console.error);
    res.send("call async function");
})

app.get('/create', (req, res) => {
    createtest().
        then(() => {
            res.send("create test");
        })
})

app.get('/find', (req, res) => {
    searchtest().
        then(() => {
            //console.log(data);
            res.send("done find");
        })
})


app.get('/read', (req, res) => {
    readdoc().
        then(() => {
            //console.log(data);
            res.send("done read");
        })
})

app.get('/update', (req, res) => {
    updatedoc().
        then(() => {
            //console.log(data);
            res.send("done update");
        })
})

app.listen(port, () =>{
    console.log(`Server currently running on port ${port}`);
})




