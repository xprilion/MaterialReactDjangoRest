<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SiteSettings;

class SiteSettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $SiteSetting = SiteSettings::find(1);
        return view('settings.show', array('settings' => $SiteSetting));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all()["data"];
        $SiteSetting = SiteSettings::find(1);
        $SiteSetting->contactmail = $data["contactmail"];
        $SiteSetting->metatags = $data["metatags"];
        $SiteSetting->metadesc = $data["metadesc"];
        $SiteSetting->tracker = $data["tracker"];
        $SiteSetting->maintext = $data["maintext"];
        $SiteSetting->noindex = $data["noindex"];
        $SiteSetting->save();
        return view('settings.show', array('settings' => $SiteSetting));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
        // $settings = SiteSettings::find($id);
        // $settings->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
