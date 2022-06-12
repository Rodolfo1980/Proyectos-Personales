const planets = document.querySelectorAll('.planet')
const p_radii = [8.5, 12.5, 17, 23, 39, 49, 58, 67]
let p_radians = new Array(8).fill(0)
const p_velocities = [0.032, 0.023, 0.020, 0.016, 0.008, 0.006, 0.004, 0.003] 

const moon = document.querySelector('#moon')
const m_radius = 5
let m_radians = 4
const m_velocity = 0.2

const p_orbits = document.querySelectorAll('.p-orbit')
const m_orbit = document.querySelector('#m-orbit')

p_orbits.forEach((p_orbit,index)=>{
    p_orbit.style.height = `${p_radii[index]*2}vmin`
    p_orbit.style.width = `${p_radii[index]*2}vmin`
})

setInterval(()=>{
    planets.forEach((planet, index) => {
        if (navigator.userAgent.indexOf("Chrome") != -1) {
            planet.style.marginLeft = `${Math.cos(p_radians[index]) * p_radii[index]}vmin`
            planet.style.marginTop = `${Math.sin(p_radians[index]) * p_radii[index]}vmin`
        } else {
            planet.style.marginLeft = `${Math.cos(p_radians[index]) * p_radii[index]*2}vmin`
            planet.style.marginTop = `${Math.sin(p_radians[index]) * p_radii[index]*2}vmin`
        }    
        p_radians[index] += p_velocities[index] 
    })

    moon.style.marginLeft = `${earthX() + (Math.cos(m_radians) * m_radius)}vmin`
    moon.style.marginTop = `${earthY() + (Math.sin(m_radians) * m_radius)}vmin`
    m_radians += m_velocity 

    m_orbit.style.marginLeft = `${earthX()}vmin`
    m_orbit.style.marginTop = `${earthY()}vmin`
},1000/30)

function earthX() {
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        return Number(planets[2].style.marginLeft.split('vmin')[0] * 2)
    } else {
        return Number(planets[2].style.marginLeft.split('vmin')[0])
    }    
}

function earthY() {
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        return Number(planets[2].style.marginTop.split('vmin')[0] * 2)
    } else { 
        return Number(planets[2].style.marginTop.split('vmin')[0])
    }    
}