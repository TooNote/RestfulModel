import axios from 'axios';
// import {getConfig} from './config';

// const API_PATH = '/api/v1';
// let URL_BASE = 'https://toonote.113.im';
// let agent;

class RestfulModel{
	constructor(options){
		if(!options){
			throw new Error('[RestfulModel] options required.');
		}
		this.model = options.model;
		this._baseUrl = options.baseUrl;
		this._path = options.path || `${this.model}`;
		this._modelUrl = `${this._baseUrl}${this._path}`;
		this._headers = options.headers || {};
		this._timeout = options._timeout || 30 * 1000;
		this._agent = this._getAgent();
	}
	async create(data){
		return this._agent.post(this._modelUrl, data).then(this._filterResponse);
	}
	async update(data){
		return this._agent.put(this._modelUrl + `/${data.id}`, data).then(this._filterResponse);
	}
	async delete(id){
		return this._agent.delete(this._modelUrl + `/${id}`).then(this._filterResponse);
	}
	async read(id, options = {}){
		let url = this._modelUrl;
		let params = {};
		if(id){
			// single item
			url += `/${id}`;
		}else{
			// liste
			params = {
				limit: options.limit || 10,
				page: options.page || 1
			};
		}
		return this._agent.get(url, {
			params
		}).then(this._filterResponse);
	}
	_getAgent(){
		return axios.create({
			baseURL: this._modelUrl,
			timeout: this._timeout,
			headers: this._headers
		});
		// ['X-TooNote-Token'] = token;
	}
	_filterResponse(response){
		if(response.status === 200){
			return response.data;
		}else{
			let err = new Error(response.statusText);
			err.code = response.status;
			throw new Error(err);
		}
	}
}

export default RestfulModel;
