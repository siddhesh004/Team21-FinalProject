use msisdb;

create table books (title char(100) primary key, author char(100), year_pub int, pages int, msrp float);

insert into books values("Gone With the Wind","Margaret Mitchell",1936,1037,14.79);
insert into books values("The Girl On The Train","Paula Hawkins",2015,316,7.48);
insert into books values("The Little Prince","Antoine de Saint-Exupéry",1943,140,5.99);
insert into books values("Dream of the Red Chamber","Cao Xueqin",1789,2339,19.25);
insert into books values("And Then There Were None","Agatha Christie",1939,272,8.60);

select*from books;
