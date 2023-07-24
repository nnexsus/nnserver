Welcome to nnserver v2!

HELLO FRIENDS!! For the past month or so I've been slowly working out all the front and backend kinks with nnexsus-server, and finally came to a realization that it'd be easier to just start over, and so, I have. Everything with nnserver 2.0 is completely revamped, new, or improved from the original. Get ready, this is gonna be long.

***__Changelog:__***
```diff
Version 2.0! [Bismuth-Update]

New (comparing from last build, even though everything is new):
+ Folder objects! Folders are no longer just a sidebar decoration! Folders can be access through the fileviewer, just like a file explorer in windows. 

+ Stackable folders! With folders being an object, it's only a rational idea to make them stackable! Folders can be created, moved, and edited inside of other folders now! 

+ Folder uploads! Finally, you can upload directly to folders! Not sure how I missed this in the past, but it's official now. 

+ Favorite files revamp! Favoriting files is no longer exclusive to their owner! You can favorite public files, and view them from the new 'Saved Files' tab in the header! 

+ New authentication system! In the past, authentication was kind of... weak. Personal info was safe, but it was easy to get into others files if you knew the name, but not any more! Session and admin keys have been implemented to secure ALL uploads and changes, or any other account data! 

+ Public files revamp! Sharing files is now even easier! Just right click a file you've uploaded, and hit 'Unlock' to make it public! Then, hit share to direct to the shared page, where you can send the link to others! You can also now track file downloads, or flag and report files. 

+ Admin panel! To improve public file security, I've implemented an admin panel backend to simplify administration. 

+ Session and local storage implements! File data is now stored in the session and local storage! This will make repeat vists, and most actions, significantly faster, and less network reliant! You can download your files with only a single request now! 

Changes:
+ Completely rebuilt site design and feel! 

+ Complete backend rebuild. Every route has been rebuilt and touched up on. Significantly less errors and crashes should be seen. And the fragility of it all has decreased significantly. 

+ Even more secure files. Files from nnserver were originally lost in the ransom event due to them just being basic windows files. Now, every account has its own folder for files in a secure SFTP directory under a linux based filesystem! 

+ More context! The context pop-up will now give much more information on progress, alerts, errors, or anything else! Mainly, the new upload/download progress bar should improve the flow feel for use of the site. 

+ Fixed network requests! All network requests finally only happen once, no more bugs or loops, and no more firing 3 times for no reason! 

+ Huge decrease in loading time for site and network resources. Massive decrease on network resources in both as well. 

Removed:
- Removed profile pictures. What was the point, honestly? 

- Removed 'Discord Files', as it was pretty much unused. 

- Mobile designs are not yet available. 
```

***__What's to come?__***
```ini
[Multi-file selectors] - you should be able to move/download/mass action across multiple files. That'll be top priority next update.
[Backend routing] - file transfer speed is my next big improvement. This won't be a site update, but instead an infrastructure one.
[Folder colors] - folders should have colors!! Maybe a hsv/rbg slider.
[File renaming] - this is priority for next time, too.
[More sorting methods] - inverse methods for recent/saved, and by type/downloads/alphabetical are in the near future
```

*one last note, video thumbnails and fullsize previews are two things i could not hammer out before the update, but ill update here when theyre implemented*