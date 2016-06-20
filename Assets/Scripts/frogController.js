/**
* Лягушка
*
* Класс описывает поведение противника-лягушки.
*
* @author	   Kirill Romanov
* @version	  1.0
* @copyright	GNU Public License
* @todo		 Реализовать поворот при столкновении с препятствием
*/

#pragma strict

/**
* Пауза между прыжками
*
* Задает паузу в секундах между прыжками
*
* @var int pause
*/
public var pause : int;
/**
* Сила прыжка
*
* Сила прыжка лягушки
*
* @var int jump
*/
public var jump : float;


/**
* Физическое тело
*
* Ссылка на физическое тело объекта
*
* @var Rigidbody2D rigidBody
*/
private var rigidBody : Rigidbody2D;
/**
* Аниматор
*
* Ссылка на аниматор объекта
*
* @var Animator animator
*/
private var animator : Animator;
/**
* Направлен вправо
*
* Определяет, в какую сторону сейчас повернут объект
*
* @var boolean facingRight
*/
private var facingRight : boolean = false;


/**
* Инициализация объекта
*
* Устанавливает значение свойствам {@link animator} и {@link rigidBody}
*
* @return	void
*/
function Start()
{
	animator = GetComponent(Animator);
	rigidBody = GetComponent(Rigidbody2D);
}


/**
* Фиксированное обновление объекта
*
* При нахождении лягушки в состоянии покоя раз в {@link pause} секунд
* устанавливает горизонтальную и вертикальную скорость в зависимости от
* значения {@link jump}, устанавливает соответствующую анимацию.
*
* @return	void
*/
function FixedUpdate()
{
	if (rigidBody.velocity.y < 0.001 && rigidBody.velocity.y > -0.001)
	{
		animator.SetBool("Ground", true);

		if (Time.time % pause == 0)
		{
			rigidBody.velocity.y = jump;
			if (facingRight)
			{
				rigidBody.velocity.x = jump * 0.5;
			}
			else
			{
				rigidBody.velocity.x = -jump * 0.5;
			}
			animator.SetBool("Ground", false);
		}
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