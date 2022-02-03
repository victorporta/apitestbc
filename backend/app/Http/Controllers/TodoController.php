<?php

namespace App\Http\Controllers;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(){
        return   \App\Models\Todo::all();
    }
    public function delete(Request $request){
        $id = $request->id;
        $todo = Todo::find($id);
        if(!is_null($todo)){
            $todo->delete();
        }
        return \App\Models\Todo::all();
       
        
    }
    public function add(Request $request){
        $data = $request->all();
        $todo = new Todo;
        $todo->name= $data["name"];
        $todo->save();
        
        return  Todo::find($todo->id);
    }
    public function edit(Request $request){
        $Todo = \App\Models\Todo::findOrFail($request->input("id"));
        $Todo->name = $request->input("name");
        $Todo->save();
        
        return  Todo::find($Todo->id);
    }
}
