<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GenerateImageController extends Controller
{
    public function index(){
        return ["ok"];
    }
    public function image(Request $request){
        $data= $request->all();
        $image_64 = $data['img'];
        if(isset($image_64) and !empty($image_64)){
            $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1]; 
            $replace = substr($image_64, 0, strpos($image_64, ',')+1); 
            $image = str_replace($replace, '', $image_64); 
            $image = str_replace(' ', '+', $image); 
            $path =  public_path().'/';
            $file = "images/".uniqid().".".$extension;
            
            $success = file_put_contents($path.$file, base64_decode($image));
            return [
                "img" => "//".$_SERVER['SERVER_NAME']."/".$file
            ];
        }
    }
}
