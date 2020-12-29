
const express=require('express');
const mysql=require('mysql');
const app=express();

const db=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'student'

})
db.connect((err)=>{
    if(err)
    {
        throw err;
    }
    console.log("Successfully connected");
});
app.get('/createdatabase',(req,res)=>{
    let sql="CREATE DATABASE student";
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Database created")
        
    })
})
    app.get('/createtable1',(req,res)=>{
        let sql='CREATE TABLE candidate(id int AUTO_INCREMENT,name VARCHAR(255),email VARCHAR(255),PRIMARY KEY (id))';
        db.query(sql,(err,result)=>{
            if(err){
                throw err;
            }
            console.log(result);
            res.send("Candidate Table created");
            
        })
})
app.get('/createtable2',(req,res)=>{
    let sql="CREATE TABLE test_score(id int AUTO_INCREMENT,first_round int,second_round int,third_round int,PRIMARY KEY (id))";
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send("test_score table created")
        
    })
})
app.get('/insertcandidate',(req,res)=>{
    let insert1={name:'Deepak',email:'Deepak@gmail.com'};
    let sql='INSERT INTO candidate SET ?';
    db.query(sql,insert1,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Candidate data added');
    });
});
app.get('/insertscore',(req,res)=>{
    let insert2={first_round:6,second_round:7,third_round:6}
        
    let sql='INSERT INTO test_score SET ?';
    db.query(sql,insert2,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('test_score data added');
    });
});
app.get('/avground',(req,res)=>{
    let sql1="SELECT name,MAX(first_round),MAX(second_round),MAX(third_round) FROM candidate INNER JOIN test_score";
    let sql2="SELECT AVG(first_round),AVG(second_round),AVG(third_round) FROM test_score";
    db.query(sql1,(err,result)=>{
        if(err) throw err;
        console.log(result);
       
        
    })
    db.query(sql2,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Highest and average score fetched');
        
    })

})
app.listen(3000,()=>{
    console.log("Server running on port 3000");
    
})
