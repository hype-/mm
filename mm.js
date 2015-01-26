if (Meteor.isClient) {
  Template.body.helpers({
    bridesmaids: function () {
      return [
        {
          name: "Jenny Muttilainen",
          text: "Jenny tutustui Melindaan yläasteella. He ovat hyvin läheisiä ja heillä on aina hauskaa yhdessä. Jenny on luvannut laittaa Melindan hääkampauksen.",
          image: "jenny.jpg"
        },
        {
          name: "Annina Ahlroth",
          text: "Annina tutustui Melindaan lukiossa. Heillä on yhteinen musta huumorintaju, samanlainen ruoka & viinimaku sekä tärkeä yhteinen tanssiharrastus.",
          image: "annina.jpg"
        },
        {
          name: "Minna Kotilainen",
          text: "Minna ja Melinda tapasivat lukiossa. Muiden on vaikea saada suunvuoroa kun he ovat yhdessä. He jakavat yhteisen musiikkimaun ja innostuksen kieltenopiskeluun.",
          image: "minna.jpg"
        },
        {
          name: "Laura Ojala",
          text: "Laura on Melindan vanhin ystävä. He tutustuivat seitsemänvuotiaana jalkapallokentällä. Heidät löydät helposti kikattelemasta oudoille jutuille. Hääkutsut ovat Lauran käsialaa.",
          image: "laura.jpg"
        },
        {
          name: "Netta Koso",
          text: "Netta on Melindan pikkusisko. Hän tykkää urheilusta ja pelaa jalkapalloa PK-35 Vantaassa. Uravalinta on vielä auki mutta Netta viihtyy lasten parissa ja toimii tällä hetkellä koulunkäyntiavustajana.",
          image: "netta.jpg"
        },
        {
          name: "Sanna Saarinen",
          text: "Sanna on Melindalle melkein kuin sisko. Hän on tutustunut Melindaan Netan kautta ja ollut Melindan kanssa samassa työpaikassa. Sanna pelaa jalkapalloa Suomen maajoukkueessa.",
          image: "sanna.jpg"
        },
        {
          name: "Miko Koso",
          text: "Miki on Melindan pikkuveli. Hän on siskojensa tapaan vilkas ja innostunut uusista asioista. Miki tykkää jalkapallosta mutta tällä hetkellä parasta on juuri hankittu mopokortti.",
          image: "miki.jpg"
        },
        {
          name: "Tommi Vesterinen",
          text: "Tommi on Mikon vanhin ja paras ystävä. He viettävät paljon aikaa yhdessä ja heillä on monia yhteisiä harrastuksia. Tommi on tuntenut Mikon ala-asteelta saakka.",
          image: "tommi.jpg"
        }
      ];
    }
  });

  Template.body.events({
    'click #js-register': function (event, template) {
      var nameElement = template.find('#js-name');
      var name = nameElement.value.trim();

      var allergiesElement = template.find('#js-allergies');
      var allergies = allergiesElement.value.trim();

      var mappings = [
        {element: nameElement, value: name, required: true},
        {element: allergiesElement, value: allergies, required: false}
      ];

      validate.call(this, mappings, function () {
        var arrival = template.find('input[name=js-arrival]:checked').value;

        saveRegistration.call(this, name, allergies, arrival);

        // TODO: show success
      });
    },

    'click #js-add-song': function (event, template) {
      var songElement = template.find('#js-song');
      var song = songElement.value.trim();

      var mappings = [
        {element: songElement, value: song, required: true}
      ];

      validate.call(this, mappings, function () {
        saveSong.call(this, song);

        // TODO: show success
      });
    }
  });

  var saveRegistration = function (name, allergies, arrival) {
    RegistrationCollection.insert({
      name: name,
      allergies: allergies,
      arrival: arrival
    });
  };

  var validate = function (mappings, onSuccess) {
    var errors = false;

    mappings.forEach(function (mapping) {
      if (mapping.required && ! mapping.value) {
        errors = true;

        errorize.call(this, mapping.element);
      } else {
        unerrorize.call(this, mapping.element);
      }
    }, this);

    if (! errors) {
      mappings.forEach(function (mapping) {
        clear.call(this, mapping.element);
      }, this);

      onSuccess.call(this);
    }
  };

  var saveSong = function (song) {
    SongCollection.insert({
      song: song
    });
  };

  var errorize = function (element) {
    jQuery(element).parent('.form-group').addClass('has-error');
    jQuery(element).next('.help-block').removeClass('hidden');
  };

  var unerrorize = function (element) {
    jQuery(element).parent('.form-group').removeClass('has-error');
    jQuery(element).next('.help-block').addClass('hidden');
  };

  var clear = function (element) {
    unerrorize.call(this, element);

    element.value = '';
  };
}
