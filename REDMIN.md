**WELCOM TO THIS PORTFOLIO**

**SETUP**
_1_ : RUN deploy.sh
_2_ : RUN migration.sh
_3_ : Test the endpoint

**LOGIN**
_1_ : create user
=> url : http://localhost/api/login
=> data : {
"username":"Johns",
"password":"Johns2024"
}
**USER**
_1_ : create user
=> url : http://localhost/api/user/
=> data : {
"fname": "Toto",
"lname": "Tata",
"role": 1,
"civilitie": 1,
"email": "toto6@gmail.com",
"password": "123456",
"username": "Toto"
}
**CONTACT**
_1_ : create user
=> url : http://localhost/api/contact/
=> data : {
"contact_name": "David",
"contact_email": "david@gmail.com",
"contact_country": 46,
"contact_zipcode":"101",
"contact_city": "Antananarivo",
"contact_adress_1": "Analakely",
"contact_user_id_update": 1,
"contact_user_id_create": 1
}
