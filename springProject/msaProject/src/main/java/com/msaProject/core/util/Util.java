package com.msaProject.core.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Base64;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class Util {

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
