package Database;

import java.sql.*;  
class Connection{  
public static void main(String args[]){  
	try{  
		Class.forName("com.mysql.jdbc.Driver"); 
		String[] row = {"imgUrl","index_val","Added","name","price","rating","binding","publisher","releaseDate","details"};
		java.sql.Connection con=DriverManager.getConnection("jdbc:mysql://localhost/mydb1","root","admin");  
		//here sonoo is database name, root is username and password  
		java.sql.Statement stmt=con.createStatement();  
		java.sql.ResultSet rs=stmt.executeQuery("select * from Books_table"); 
		while(rs.next()) {
				System.out.print(rs.getObject(row[0])+"\t"
						+rs.getObject(row[1])+"\t"
						+rs.getObject(row[2])+"\t"
						+rs.getObject(row[3])+"\t"
						+rs.getObject(row[4])+"\t"
						+rs.getObject(row[5])+"\t"
						+rs.getObject(row[6])+"\t"
						+rs.getObject(row[7])+"\t"
						+rs.getObject(row[8])+"\t"
						+rs.getObject(row[9])+"\n"
						);
			}
		con.close();  
	}catch(Exception e){ System.out.println(e);}  
	}  
}  