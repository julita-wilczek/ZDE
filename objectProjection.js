// 1.3.	Develop a program “Object Projection”.
// Input: any JSON object; prototype object.
// Output: projected object.
// Projected object structure shall be intersection of source object and prototype object structures.
// Values of properties in projected object shall be the same as values of respective properties in source object.

const srcJSON ='{"prop11":{"prop21":21,"prop22":{"prop31":31,"prop32":32}},"prop12":12}';
const sourceObject = JSON.parse(srcJSON);
const prototypeObject = { prop11: { prop22: null } };

const sourceObject2 = JSON.parse('{"prop11": { "prop21": 21,"prop22": {"prop31": {"prop41": 41},"prop32":32}},"prop12":12}');
const prototypeObject2 = { prop11: { prop22: null }, prop13: null };

const sourceObject3 = JSON.parse('{"prop11":{"prop21":21,"prop22":{"prop31":null,"prop32":32}},"prop12":{"prop23":{"prop33":33}}}');
const prototypeObject3 = { prop11: { prop22: { prop31: null } }, prop12: null };

const sourceObject4 = {prop22: null, prop33: {prop331: 1,prop332:2},prop11: {prop111: "value",prop112: {prop112: null}}};
const prototypeObject4 = {prop11:{prop22: null,prop111: {prop111: null},prop112: null}, prop33: {}, prop22: 2};

const projectObject = (source, prototype) => {

    return Object.assign({}, ...Object.keys(prototype).map(key => 
        {if (key in source) {
            if (prototype[key] && typeof prototype[key] === 'object') {
                if (Object.keys(prototype[key]).length === 0) {
                    return {[key]: source[key]}
                } else {
                    const nested = projectObject(source[key], prototype[key])
                    return Object.keys(nested).length
                    ? { [key]: nested }
                    : {};
                }
            } else {
      return {[key]: source[key]}}
        }}))
}

console.log(projectObject(sourceObject, prototypeObject)); // expected {prop11: {prop22: {prop31:31, prop32: 32}}};
console.log(projectObject(sourceObject2, prototypeObject2)); // expected {prop11: {prop22: {prop31: {prop41: 41}, prop32: 32}}};
console.log(projectObject(sourceObject3, prototypeObject3)); // expected {prop11: {prop22: {prop31: null}}, prop12: {prop23: {prop33:33}}};
console.log(projectObject(sourceObject4, prototypeObject4)) // expected { "prop11": { "prop112": {"prop112": null}},"prop33": {"prop331": 1,"prop332": 2},"prop22": null}