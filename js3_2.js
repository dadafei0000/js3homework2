function View(container, model){
    var _input = document.createElement('input'),
        _options = document.createElement('div');
    
    _input.setAttribute('type', 'text');
   
    
    container.appendChild(_input);
    container.appendChild(_options);
    
  
    
    _input.addEventListener('keyup', function(e){
        var inputText = e.target.value;

        model.fetchData(inputText);
    });
    
   
    
    function render(data){

       
            _options.innerHTML = '';
 
         for(let option of data) {
       _options.innerHTML+= option+"<br/>" ;
        }
     
    }
    model.subscribe(render);
    
}



function model(){
    var _subscriber, _cache={}, _data;
    
    function _fetchData(text){
        
        if(_cache[text]) {
            apiBack(_cache[text]);
        } else {
            fetch('https://swapi.co/api/people/?search=' + text)
                .then(response => response.json())
                .then(function(json){
                    _cache[text] = json;
                    apiBack(json);
                });
        }
    }
    
    function apiBack(json) {
        var names = json.results.map(function(item){
            return item.name;
        });
        
        _data = names;
        
        _subscriber(_data);
    }
    
   

    return {
        subscribe: function(_data) {
            if(!_subscriber) _subscriber = _data;
        },
        fetchData: _fetchData
      
    }
}




var Container = document.querySelector('.typeahead-container');
var model = model();

View(Container, model);
