package com.msaProjectMenu01.core.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.Random;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class Util {

	// 첨부파일 Rename
	public static String getUuid(String pkValue, String fieldName)  throws Exception {
		Random numGen = SecureRandom.getInstance("SHA1PRNG");
		int randomInt = (numGen.nextInt(6)) + 1; 
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmSS");
		String curDate = sdf.format(date);
		String strRowNum = "";
		String fileName = pkValue + curDate + strRowNum + randomInt; // 파일 rename시 변경할 부분
		return fileName; 
	}
	
	public static byte[] convertFileToByteArray(String filePath) throws IOException {
        File file = new File(filePath);
        
        if(!file.exists()) return new byte[0];
        
        FileInputStream fis = null;
        byte[] byteArray = new byte[(int) file.length()];

        try {
            fis = new FileInputStream(file);
            fis.read(byteArray);
        } finally {
            if (fis != null) {
                fis.close();
            }
        }

        return byteArray;
    }
	
	public static Map<String,Object> getSessionData(HttpServletRequest request) throws IOException, ClassNotFoundException {
		HttpSession session = request.getSession();
		String sessId = session.getId();
		if( sessId.indexOf(".") > -1 ) {
			sessId = sessId.substring(0, sessId.indexOf("."));
		}
		Object object = session.getServletContext().getContext("/").getAttribute(sessId);
		Map<String, Object> sessionMap = null;
		if( object != null ) {
			UserInfo userInfo = (UserInfo) deserialize(object.toString());
			if( userInfo != null ) {
				sessionMap = userInfo.getMaps();
			}
		}
		return sessionMap;
	}
	
	public static Object deserialize(String s) throws IOException,	ClassNotFoundException {
		Object o = new Object();

		if ( s != null )  {
			byte[] data = Base64.getDecoder().decode(s);
			ObjectInputStream ois = new ObjectInputStream(
					new ByteArrayInputStream(data));
			o = ois.readObject();
			ois.close();
		}
		return o;
	}
	
	public static String serialize(UserInfo info) throws IOException {
	    ByteArrayOutputStream baos = new ByteArrayOutputStream();
	    ObjectOutputStream oos = new ObjectOutputStream(baos);
	    oos.writeObject(info);
	    oos.close();
	    return Base64.getEncoder().encodeToString(baos.toByteArray());
	}
}
