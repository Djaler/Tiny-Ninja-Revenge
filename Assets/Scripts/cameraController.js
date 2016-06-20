/**
* Камера
*
* Класс описывает поведение камеры.
*
* @author	   Kirill Romanov
* @version	  1.0
* @copyright	GNU Public License
*/

#pragma strict

/**
* Время задержки
*
* Время задержки перед сдвигом камеры за целью.
*
* @var float dampTime
*/
public var dampTime : float = 0.15;
/**
* Цель
*
* Объект, за которым движется камера
*
* @var Transform target
*/
public var target : Transform;

/**
* Камера
*
* Компонент камеры
*
* @var Camera cameraObject
*/
private var cameraObject : Camera;


/**
* Инициализация объекта
*
* Устанавливает значение свойству {@link cameraObject}.
*
* @return	void
*/
function Start ()
{
	cameraObject = GetComponent(Camera);
}


/**
* Обновление объекта
*
* Плавно перемещает камеру в точку, определяемую свойством {@link target},
* изменяя значение свойства position у {@link transform}
*
* @return	void
*/
function Update ()
{
	var point = cameraObject.WorldToViewportPoint(Vector3(target.position.x, target.position.y + 0.2, target.position.z));
	var delta = Vector3(target.position.x, target.position.y + 0.2, target.position.z) - cameraObject.ViewportToWorldPoint(Vector3(0.5, 0.5, point.z));
	var destination : Vector3 = transform.position + delta;

	var velocity : Vector3 = Vector3.zero;
	transform.position = Vector3.SmoothDamp(transform.position, destination, velocity, dampTime);
}
