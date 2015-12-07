package controllers

import play.api._
import play.api.mvc._


import play.api.Play.current
import play.api.libs.ws._
import scala.concurrent.Future

import play.api.libs.concurrent._
import play.api.libs.concurrent.Execution.Implicits._

import play.api.libs.json._
import play.api.libs.functional.syntax._

import play.api.Play.current

class ApiPiwik extends Controller {

  def visits = Action.async {
    val baseUrl = current.configuration.getString("api.baseUrl").get
    val idSite = current.configuration.getString("api.idSite").get
    val token = current.configuration.getString("api.token").get
    
    val date = "last5"

  	val url = s"$baseUrl?module=API&method=Actions.getPageUrls&idSite=$idSite&date=$date&period=day&format=json&filter_limit=20&token_auth=$token"
  	val response = WS.url(url).get()

  	response.map { r => 
  		Ok(r.body)	
  	}

  	
  }

}
