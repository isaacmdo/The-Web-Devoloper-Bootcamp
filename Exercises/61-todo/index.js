// Leave the next line, the form must be assigned to a variable named 'form' in order for the exercise test to pass
const form = document.querySelector('form');
const ul = document.querySelector('#list');

document.addEventListener('submit', function(e){
    e.preventDefault();
    
    addToDo();
});

function addToDo(){
    const product = form.elements.product.value;
    const qty = form.elements.qty.value;
    
    const li = document.createElement('li');
    li.append(qty);
    li.append(` ${product}`);
    ul.append(li);
    form.elements.product.value = '';
    form.elements.qty.value = '';
}