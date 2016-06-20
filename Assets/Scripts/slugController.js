/**
* Слизень
*
* Класс описывает поведение противника-слизня.
*
* @author	   Kirill Romanov
* @version	  1.0
* @copyright	GNU Public License
* @todo		 Реализовать поворот при столкновении с препятствием
*/

#pragma strict

/**
* Скорость
*
* Скорость передвижения слизня
*
* @var float speed
*/
public var speed : float = 0.1;


/**
* Направлен вправо
*
* Определяет, в какую сторону сейчас движется слизень
*
* @var boolean facingRight
*/
private var facingRight : boolean = false;
/**
* Аниматор
*
* Ссылка на аниматор объекта
*
* @var Animator animator
*/
private var animator : Animator;


/**
* Инициализация объекта
*
* Устанавливает значение свойству {@link animator}.
*
* @return	void
*/
function Start()
{
	animator = GetComponent(Animator);
}


/**
* Обновление объекта
*
* Перемещает объект в сторону, определяемую свойством {@link facingRight} в
* зависимости от {@link speed}
*
* @return	void
*/
function Update ()
{
	if (facingRight)
	{
		transform.position.x += speed * Time.deltaTime;
	}
	else
	{
		transform.position.x -= speed * Time.deltaTime;
	}
}


/**
* Поворот объекта
*
* Инвертирует значение свойства {@link facingRight}.
* Выполняет поворот у объекта {@link animator}.
*
* @return	void
*/
function Flip()
{
	facingRight = !facingRight;
	animator.transform.Rotate(0, 180, 0);
}

function OnCollisionEnter2D(collision : Collision2D)
{
	if (collision.gameObject.tag == "Enemy")
	{
		Flip();
	}
}