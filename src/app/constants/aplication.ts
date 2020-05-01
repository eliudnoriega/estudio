export const COMPANIAS_TELEFONICAS = [
  {value: 1, text: 'Claro'},
  {value: 2, text: 'Tigo'},
  {value: 3, text: 'Movistar'}
];

export const SURVEY_TYPES = [
  {value: 0, text: 'Preguntas y Respuestas', description: 'Usted Escribe las Preguntas Y espera una respuesta', icon: 'libro'}
];

export const QUESTION_TYPES = [
  {value: 0, text: 'Número', type: 'number', possibleAnswers: false},
  {value: 1, text: 'Texto-corto', type: 'text', possibleAnswers: false},
  {value: 2, text: 'Párrafo', type: 'area', possibleAnswers: false},
  {value: 3, text: 'Lista desplegable', type: 'select', possibleAnswers: true},
  {value: 4, text: 'Opciones', type: 'option', possibleAnswers: true},
  {value: 6, text: 'Check', type: 'check', possibleAnswers: true},
  {value: 7, text: 'Tabla1', type: 'table'},
  {value: 8, text: 'Tabla2', type: 'table2'},
];
//{value: 5, text: 'Opciones Con Iconos', type: 'optionIcons', possibleAnswers: true},

export const SITE_KEY = '6Le5Ge0UAAAAAAWZm5jYWea8KsbnqR0ssYIo9RSP';
