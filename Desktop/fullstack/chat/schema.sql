create table chat(
    id varchar(50) not null ,
    sender varchar(50) not null ,
    reciever varchar(50) not null,
    message varchar(100) default "No Messasge"
);