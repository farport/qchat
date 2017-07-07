(function() {
	var HelloApp,
		NameThing,
		ListThing;

	ListThing = ng
		.Component({
			selector: 'list-thing',
			template: '<ul><li *ng-for="#name of names">{{name}}</li></ul>',
			directives: [ng.NgFor]
		})
		.Class({
			constructor: function() {
				this.names = ['John', 'Joe', 'Jeff', 'Jorge'];
			}
		});
		
	NameThing = ng
		.Component({
			selector: 'name-thing',
			template: '<span>{{person.name}}</span>',
			properties: ['person']
		})
		.Class({
			constructor: [new ng.Attribute('person'), function(person) {
				this.person = person;

				setTimeout(function() {
					this.person.name = 'NameThing Change';
				}.bind(this), 1000);
			}]
		});

	HelloApp = ng
		.Component({
			selector: 'hello-app',
			template: '<h1><name-thing [person]="person"></name-thing></h1>' +
        		'<h3>{{person.name}}</h3>' +
        		'<list-thing></list-thing>' +
        		'<input type="text" [(ng-model)]="person.name">',
			directives: [ng.FORM_DIRECTIVES, NameThing, ListThing]
		})
		.Class({
			constructor: function() {
                this.person = { 
                    name: 'Langdon'
                };

				setTimeout(function() {
					this.person.name = 'HelloApp Change';
				}.bind(this), 500);
			}
		});

	document.addEventListener('DOMContentLoaded', function() {
		ng.bootstrap(HelloApp);
	});
}());
