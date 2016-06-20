/**
* Противник
*
* Класс определяет поведение противника.
*
* @author	   Kirill Romanov
* @version	  1.0
* @copyright	GNU Public License
*/

#pragma strict

/**
* Убиваемость
*
* Определяет, можно ли убить данного противника
*
* @var boolean killable
*/
public var killable : boolean;


/**
* Смерть
*
* Если установлено положительное значение {@link killable}, то уничтожает данного
* противника, включив соответствующую анимацию
*
* @return	void
*/
function Die()
{
	if (killable)
	{
		GetComponent(Animator).SetTrigger("Die");
		GetComponent(CircleCollider2D).enabled = false;
		var rigidBody = GetComponent(Rigidbody2D);
		rigidBody.constraints = RigidbodyConstraints2D.FreezeRotation;
		rigidBody.velocity.y = 2;
	}
}
