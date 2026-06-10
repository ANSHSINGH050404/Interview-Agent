import type { Request, Response } from "express";


export const preInterview  = async (req:Request,res:Response)=>{

    const {username} = req.body;

    if(!username){
        return res.status(400).json({message:"Username is required"});
    }

    const github= await fetch(`https://api.github.com/users/${username}/repos`);
    const githubData:any = await github.json();
    const userData= githubData.map((repo:any)=>{
        return {
            name: repo.name,
            description: repo.description,
            fullname:repo.full_name,
            starCount: repo.stargazers_count,
        }
        });

    return res.status(200).json({message:"Pre-interview completed", userData });

}